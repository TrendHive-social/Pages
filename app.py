from flask import Flask, request, jsonify
import ffmpeg
import librosa
import numpy as np
import tempfile
import os

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'video' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded'}), 400

    video_file = request.files['video']

    # Save the uploaded video temporarily
    temp_video = tempfile.NamedTemporaryFile(delete=False)
    video_file.save(temp_video.name)

    # Video Metrics
    video_metrics = analyze_video(temp_video.name)

    # Audio Metrics (Extract audio from video)
    audio_metrics = analyze_audio(temp_video.name)

    # Remove the temporary video file after analysis
    os.remove(temp_video.name)

    return jsonify({
        'status': 'success',
        'video': video_metrics,
        'audio': audio_metrics
    })

def analyze_video(video_path):
    # Extract video details using ffmpeg
    video_info = ffmpeg.probe(video_path, v='error', select_streams='v:0', show_entries='stream=width,height,avg_frame_rate,bit_rate')
    video_stream = video_info['streams'][0]

    resolution = f"{video_stream['width']}x{video_stream['height']}"
    frame_rate = eval(video_stream['avg_frame_rate'])  # Convert the frame rate to a float
    bitrate = int(video_stream['bit_rate']) / 1000  # Convert bitrate to kbps

    return {
        'resolution': resolution,
        'frame_rate': frame_rate,
        'bitrate': f"{bitrate:.2f} kbps"
    }

def analyze_audio(video_path):
    # Extract audio from video using ffmpeg
    temp_audio = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
    ffmpeg.input(video_path).output(temp_audio.name).run()

    # Load the audio file using librosa
    y, sr = librosa.load(temp_audio.name)

    # Calculate audio features
    duration = librosa.get_duration(y=y, sr=sr)
    rms_energy = np.mean(librosa.feature.rms(y=y))
    spectral_centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))

    # Remove the temporary audio file after analysis
    os.remove(temp_audio.name)

    return {
        'duration': f"{duration:.2f} seconds",
        'sample_rate': sr,
        'rms_energy': f"{rms_energy:.2f}",
        'spectral_centroid': f"{spectral_centroid:.2f} Hz"
    }

if __name__ == '__main__':
    app.run(debug=True)
