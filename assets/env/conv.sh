#!/bin/bash
for i in {1..29}; do
	convert water-f1.png -background transparent -alpha set -channel A -evaluate set "$[3333 * $i / 1000]%" water-f1-"$i".png
	composite -background transparent -gravity center water-f1-$i.png water-f3.png water-f1-$i.png
done
