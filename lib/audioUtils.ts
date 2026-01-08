/**
 * Audio utility functions for converting raw PCM data to WAV format
 * Based on Google AI Studio TTS example
 */

/**
 * Converts raw PCM Int16 audio data to WAV format with proper headers
 * @param pcmData - Raw PCM audio data as Uint8Array (Int16 format)
 * @param sampleRate - Sample rate in Hz (default: 24000)
 * @param numChannels - Number of audio channels (default: 1 for mono)
 * @returns WAV file as Buffer
 */
export function pcmToWav(
  pcmData: Uint8Array,
  sampleRate: number = 24000,
  numChannels: number = 1
): Buffer {
  const dataInt16 = new Int16Array(pcmData.buffer, pcmData.byteOffset, pcmData.byteLength / 2);
  const numSamples = dataInt16.length / numChannels;

  // WAV file structure:
  // - RIFF header (12 bytes)
  // - fmt chunk (24 bytes)
  // - data chunk header (8 bytes)
  // - actual audio data
  const headerSize = 44;
  const fileSize = headerSize + pcmData.byteLength;

  const buffer = Buffer.alloc(fileSize);
  let offset = 0;

  // Helper functions to write data
  const writeString = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      buffer[offset++] = str.charCodeAt(i);
    }
  };

  const writeUint32 = (value: number) => {
    buffer.writeUInt32LE(value, offset);
    offset += 4;
  };

  const writeUint16 = (value: number) => {
    buffer.writeUInt16LE(value, offset);
    offset += 2;
  };

  // RIFF header
  writeString('RIFF'); // ChunkID
  writeUint32(fileSize - 8); // ChunkSize (file size - 8 bytes)
  writeString('WAVE'); // Format

  // fmt sub-chunk
  writeString('fmt '); // Subchunk1ID
  writeUint32(16); // Subchunk1Size (16 for PCM)
  writeUint16(1); // AudioFormat (1 = PCM)
  writeUint16(numChannels); // NumChannels
  writeUint32(sampleRate); // SampleRate
  writeUint32(sampleRate * numChannels * 2); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  writeUint16(numChannels * 2); // BlockAlign (NumChannels * BitsPerSample/8)
  writeUint16(16); // BitsPerSample (16-bit PCM)

  // data sub-chunk
  writeString('data'); // Subchunk2ID
  writeUint32(pcmData.byteLength); // Subchunk2Size (size of audio data)

  // Copy PCM data - convert Uint8Array to Buffer if needed
  if (Buffer.isBuffer(pcmData)) {
    pcmData.copy(buffer, offset);
  } else {
    // If it's a Uint8Array, copy it manually
    for (let i = 0; i < pcmData.byteLength; i++) {
      buffer[offset + i] = pcmData[i];
    }
  }

  return buffer;
}

/**
 * Decodes base64 string to Uint8Array
 * @param base64 - Base64 encoded string
 * @returns Decoded data as Uint8Array
 */
export function decodeBase64(base64: string): Uint8Array {
  const buffer = Buffer.from(base64, 'base64');
  return new Uint8Array(buffer);
}

/**
 * Encodes Uint8Array to base64 string
 * @param bytes - Data to encode
 * @returns Base64 encoded string
 */
export function encodeBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64');
}
