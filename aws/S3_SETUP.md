# AWS S3 + CloudFront Setup

## 1. Create S3 Bucket
1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com)
2. Click **Create bucket**
3. Bucket name: `streamfree-audio` (must be unique)
4. AWS Region: Choose closest to your users
5. Uncheck "Block all public access" (we need public read for streaming)
6. Acknowledge the warning
7. Click **Create bucket**

## 2. Configure Bucket Permissions
1. Click on your bucket → **Permissions** tab
2. Edit **Bucket policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::streamfree-audio/*"
    }
  ]
}
```

## 3. Configure CORS
1. In bucket **Permissions**, edit **Cross-origin resource sharing (CORS)**:
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"]
  }
]
```

## 4. Create CloudFront Distribution
1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront)
2. Click **Create Distribution**
3. **Origin Domain**: Select your S3 bucket
4. **Origin Access**: Choose "Legacy access identity" or "Public"
5. **Default Root Object**: Leave empty
6. **Price Class**: Choose regions closest to users
7. Click **Create Distribution**

## 5. Get CloudFront URL
1. Wait for distribution to deploy (status shows "Deployed")
2. Copy the **Domain Name** (e.g., `d1234567890.cloudfront.net`)
3. Use this as `NEXT_PUBLIC_AWS_CLOUDFRONT_URL` in your `.env.local`

## 6. Upload Audio Files
Upload MP3/WAV/FLAC files to your S3 bucket using:
- AWS Console
- AWS CLI: `aws s3 cp song.mp3 s3://streamfree-audio/tracks/`
- Or configure an upload form in your app

## Cost Notes
- S3: ~$0.023/GB storage
- CloudFront: ~$0.085/GB transfer (first 1TB)
- Free tier: 5GB storage, 15GB data transfer out
