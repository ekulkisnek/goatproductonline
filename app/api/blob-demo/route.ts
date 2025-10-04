import { put, del, list } from '@vercel/blob'

export async function GET(request: Request) {
  try {
    // List existing blobs
    const { blobs } = await list()
    
    return Response.json({
      message: "☁️ Vercel Blob Storage Demo",
      timestamp: new Date().toISOString(),
      blobs: blobs.slice(0, 10), // Show first 10 blobs
      totalBlobs: blobs.length,
      features: [
        "Object storage for files",
        "Global CDN distribution",
        "Automatic image optimization",
        "1GB free storage",
        "1GB free bandwidth"
      ],
      capabilities: {
        fileTypes: ["Images", "Videos", "Documents", "Archives", "Any binary data"],
        maxSize: "4.5GB per file",
        optimization: "Automatic image optimization",
        cdn: "Global distribution",
        security: "Signed URLs available"
      },
      freeTierInfo: {
        storage: "1GB",
        bandwidth: "1GB per month",
        requests: "Unlimited",
        regions: "Global"
      },
      demo: {
        note: "Upload files using POST request",
        currentFiles: blobs.length,
        example: "POST with form-data containing file"
      }
    })
  } catch (error) {
    return Response.json({
      error: "Blob storage connection failed",
      message: "Make sure BLOB_READ_WRITE_TOKEN is set in environment variables",
      timestamp: new Date().toISOString(),
      setup: {
        step1: "Go to Vercel Dashboard > Storage > Blob",
        step2: "Create a new Blob store",
        step3: "Copy the token to your .env.local",
        step4: "Redeploy your application"
      },
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return Response.json({
        error: "No file provided",
        message: "Send a file using form-data with 'file' field",
        example: "curl -X POST -F 'file=@example.jpg' /api/blob-demo"
      }, { status: 400 })
    }
    
    // Upload file to blob storage
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true
    })
    
    return Response.json({
      message: "✅ File uploaded to Blob Storage",
      blob: {
        url: blob.url,
        pathname: blob.pathname,
        size: file.size,
        uploadedAt: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      operations: {
        uploaded: true,
        filename: file.name,
        size: file.size,
        type: file.type,
        url: blob.url
      }
    })
  } catch (error) {
    return Response.json({
      error: "Failed to upload file",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    
    if (!url) {
      return Response.json({
        error: "File URL is required",
        example: "/api/blob-demo?url=https://blob.vercel-storage.com/..."
      }, { status: 400 })
    }
    
    // Delete blob
    await del(url)
    
    return Response.json({
      message: "🗑️ File deleted from Blob Storage",
      deletedUrl: url,
      timestamp: new Date().toISOString(),
      operations: {
        deleted: true,
        url: url
      }
    })
  } catch (error) {
    return Response.json({
      error: "Failed to delete file",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
