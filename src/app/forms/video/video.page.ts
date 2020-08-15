import { Component, OnInit, Inject } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DOCUMENT } from '@angular/common';
import { Video } from 'src/app/classes/video';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private fs: FirestoreService,
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document

  ) { }

  ngOnInit() {
  }

  view = 'library';
  user;
  storage: firebase.storage.Reference;
  videos;
  uploadValue;
  uploadText;
  youtubeRegex = new RegExp('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$')
  validUrl;
  trustedVideoUrl;
  youtubeUrl;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getVideos();
    this.storage = firebase.storage().ref('videos/' + this.user.uid);
  }
  getVideos() {
    return this.fs.getCol('videos').where('uid', '==', this.user.uid).onSnapshot((s) => {
      this.videos = s.docs.map(d => d.data());
      return Promise.resolve();
    })
  }
  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('users/' + uid).then((user) => {
      this.user = user;
      return Promise.resolve();
    })
  }
  close() {
    this.helper.closeModal()
  }

  resetYoutube() {
    this.trustedVideoUrl = "";
  }


  checkUrl() {
    let url = this.youtubeUrl;
    this.validUrl = this.youtubeRegex.test(url);
    if (this.validUrl) {
      let videoId = this.getYouTubeGetID(url);
      let videoUrl = "https://www.youtube.com/embed/" + videoId;
      this.youtubeUrl = videoUrl;
      this.getSafeUrl(videoUrl)
    } else {
      this.trustedVideoUrl = ""
    }
  }

  getSafeUrl(url) {

    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);

  }

  getYouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
  }

  saveYoutubeVideo() {
    let videoId = this.getYouTubeGetID(this.youtubeUrl);
    let imageCover = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
    let video = {
      url: this.youtubeUrl,
      poster: imageCover,
      isYoutubeVideo: true,
    }
    this.helper.closeModal(video);
  }

  async uploadVideo(event) {
    // this.helper.showLoading({ message: "Uploading Video" });
    let video = new Video();
    let that = this;
    let videoFile = event.target.files[0];
    video.name = videoFile.name;
    let posterFile = this.dataURItoBlob(await this.generateThumbnail(videoFile));
    // let video: any = await this.saveFileToStorage(videoFile, "/" + videoFile.name + "/" + videoFile.name);
    // let poster: any = await this.saveFileToStorage(posterFile, "/" + videoFile.name + "/poster");
    let videoFolder = videoFile.name;
    let videoUploadTask = this.storage.child(videoFolder + "/" + videoFile.name).put(videoFile);
    let videoPosterTask = this.storage.child(videoFolder + "/" + 'poster-' + videoFile.name).put(posterFile);
    that.videos.push(video);
    videoUploadTask.on('state_changed', (snapshot) => this.getVideoUploadStatus(snapshot, video), (error) => this.helper.showError(error.message));
    video.url = await (await videoUploadTask).ref.getDownloadURL();
    video.poster = await (await videoPosterTask).ref.getDownloadURL();
    video.videoStoragePath = "videos/" + this.user.uid + "/" + videoFolder + "/" + videoFolder;
    video.posterStoragePath = "videos/" + this.user.uid + "/" + videoFolder + "/" + 'poster-' + videoFile.name;
    video.create();
  }

  getVideoUploadStatus(snapshot, video) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.uploadText = "Uploading Video";
    this.uploadValue = (progress * 0.01);
    video.loading = (progress * 0.01);
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }
  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], { type: mimeString });

  }

  generateThumbnail(videoFile: Blob): Promise<string> {
    const video: HTMLVideoElement = this.document.createElement('video');
    const canvas: HTMLCanvasElement = this.document.createElement('canvas');
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
    return new Promise<string>((resolve, reject) => {
      canvas.addEventListener('error', reject);
      video.addEventListener('error', reject);
      video.addEventListener('canplay', event => {
        // const width = 600;
        // const scaleFactor = width / img.width;
        // elem.width = width;
        // elem.height = img.height * scaleFactor;
        // ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        let width =  450;
        let height = 280;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;
        // context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        resolve(canvas.toDataURL());
      });
      if (videoFile.type) {
        video.setAttribute('type', videoFile.type);
      }
      video.preload = 'auto';
      video.src = window.URL.createObjectURL(videoFile);
      video.load();
    });
  }

  async delete(video: Video) {
    this.helper.showConfirmationAlert("Delete Video", "Are you sure you want to delete this video", "Delete").then(async (result) => {
      if (result) {
        video = Object.assign(new Video(), video);
        await firebase.storage().ref(video.videoStoragePath).delete();
        await firebase.storage().ref(video.posterStoragePath).delete();
        video.delete();
      }
    })
  }

  select(video) {
    this.helper.closeModal(video)
  }
}
