#!/usr/bin/env bash
#modprobe v4l2loopback video_nr=3,4,5 card_label="Device Number 3","Device Number 4","Device Number 5" exclusive_caps=1: 1588876663:0;
sudo modprobe v4l2loopback exclusive_caps=1

ffmpeg -re -stream_loop -1 -i ~/Videos/video_1.mkv -vf "hflip" -vcodec rawvideo -f v4l2 /dev/video0
#ffmpeg -re -stream_loop -1 -i ~/Videos/video_1.mkv -vf "hflip" -vcodec rawvideo -f v4l2 /dev/video11 &> /dev/null
#ffmpeg -re -stream_loop -1 -i ~/Videos/video_2.mkv -vf "hflip" -vcodec rawvideo -f v4l2 /dev/video12k &> /dev/null
