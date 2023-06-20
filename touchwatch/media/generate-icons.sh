#!/bin/sh

for size in 32 64 72 96 120 128 144 152 180 192 256 384 512; do
	magick icon.png -resize "$size" "_icon-$size.png"
	pngquant -f -o "icon-$size.png" "_icon-$size.png"
	rm "_icon-$size.png"
	printf %s\\n "{" "  \"src\": \"icon-$size.png\"," "  \"sizes\": \"${size}x${size}\"," "  \"type\": \"image/png\"" "},"
done
