Add-Type -AssemblyName System.Drawing
$source = "artifacts\portfolio\static\logio (1).png"
$img = [System.Drawing.Image]::FromFile($source)
$bmp = New-Object System.Drawing.Bitmap(256, 256)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 256, 256)

$bmp.Save("artifacts\portfolio\static\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("artifacts\portfolio\static\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()
