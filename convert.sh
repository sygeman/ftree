#!/bin/bash
for f in *.png; do ffmpeg -i "$f" "${f%.png}.webp"; done && rm -rf ./*.png