import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
if args.count < 2 {
	print("usage: ocr.swift <image>")
	exit(1)
}

let url = URL(fileURLWithPath: args[1])
let img = CIImage(contentsOf: url)!
let ctx = CIContext()
let cg = ctx.createCGImage(img, from: img.extent)!

let req = VNRecognizeTextRequest()
req.recognitionLanguages = ["zh-Hans", "en-US"]
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false

let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([req])

guard let obs = req.results else {
	print("no results")
	exit(1)
}

// 输出每行：bbox + text
for o in obs {
	if let top = o.topCandidates(1).first {
		let b = o.boundingBox
		// VNObservation 坐标是 [0,1] 归一化 · y 从底部起
		print("\(b.minX),\(b.minY),\(b.maxX),\(b.maxY)\t\(top.string)")
	}
}
