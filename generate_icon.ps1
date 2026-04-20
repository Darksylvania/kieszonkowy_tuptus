function New-IconPNG($size, $fileName) {
  Add-Type -AssemblyName System.Drawing
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(92,225,230), [System.Drawing.Color]::FromArgb(155,107,254), [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal)
  $g.FillRectangle($brush, $rect)
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255,255,255), [math]::Max(10, [int]($size / 32)))
  $g.DrawEllipse($pen, 34, 34, $size - 68, $size - 68)
  $fontSize = [math]::Max(48, [int]($size * 0.35))
  $font = New-Object System.Drawing.Font('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $text = 'T'
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($text, $font, [System.Drawing.Brushes]::White, $rect, $sf)
  $bmp.Save($fileName, [System.Drawing.Imaging.ImageFormat]::Png)
  $font.Dispose()
  $pen.Dispose()
  $brush.Dispose()
  $g.Dispose()
  $bmp.Dispose()
  Write-Output "Generated $fileName"
}

New-IconPNG 512 'icon-512.png'
New-IconPNG 192 'icon-192.png'
