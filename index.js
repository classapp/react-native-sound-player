/**
 * @flow
 */
'use strict'

import { NativeModules, NativeEventEmitter, Platform } from 'react-native'
// const { RNSoundPlayer } = NativeModules
// const _soundPlayerEmitter = new NativeEventEmitter(RNSoundPlayer)
let _finishedPlayingListener = null
let _finishedLoadingListener = null

export default class Player{
  constructor(params) {
    this.RNSoundPlayer = NativeModules.RNSoundPlayer
    this._soundPlayerEmitter = new NativeEventEmitter(this.RNSoundPlayer)
  }
  
  playSoundFile = (name, type) => {
    this.RNSoundPlayer.playSoundFile(name, type)
  }

  loadSoundFile = (name, type) => {
    this.RNSoundPlayer.loadSoundFile(name, type)
  }

  playUrl = (url) => {
    this.RNSoundPlayer.playUrl(url)
  }

  loadUrl = (url) => {
    this.RNSoundPlayer.loadUrl(url)
  }

  onFinishedPlaying = (callback: (success: boolean) => any) => {
    if (_finishedPlayingListener) {
      _finishedPlayingListener.remove()
      _finishedPlayingListener = undefined
    }

    _finishedPlayingListener = this._soundPlayerEmitter.addListener(
      'FinishedPlaying',
      callback
    )
  }

  onFinishedLoading = (callback: (success: boolean) => any) => {
    if (_finishedLoadingListener) {
      _finishedLoadingListener.remove()
      _finishedLoadingListener = undefined
    }

    _finishedLoadingListener = this._soundPlayerEmitter.addListener(
      'FinishedLoading',
      callback
    )
  }

  addEventListener = (eventName: 'FinishedLoading' | 'FinishedPlaying' | 'FinishedLoadingURL' | 'FinishedLoadingFile', callback: Function) => this._soundPlayerEmitter.addListener(eventName, callback)

  play = () => {
    // play and resume has the exact same implementation natively
    this.RNSoundPlayer.resume()
  }

  reset = () => {
    this.RNSoundPlayer.reset()
  }

  pause = () => {
    this.RNSoundPlayer.pause()
  }

  release = () => {
    console.log(this.RNSoundPlayer)
    this.RNSoundPlayer.release()
  }

  resume = () => {
    this.RNSoundPlayer.resume()
  }

  stop = () => {
    this.RNSoundPlayer.stop()
  }

  seek = (seconds: number) => {
    this.RNSoundPlayer.seek(seconds)
  }

  setVolume = (volume: number) => {
    this.RNSoundPlayer.setVolume(volume)
  }

  setSpeaker = (on: boolean) => {
    if(Platform.OS === "android"){
      console.log("setSpeaker is not implement on Android");
    } else {
      this.RNSoundPlayer.setSpeaker(on);
    }
  }

  getInfo = async () => this.RNSoundPlayer.getInfo()

  unmount = () => {
    if (_finishedPlayingListener) {
      _finishedPlayingListener.remove()
      _finishedPlayingListener = undefined
    }

    if (_finishedLoadingListener) {
      _finishedLoadingListener.remove()
      _finishedLoadingListener = undefined
    }
  }
}
