type StackBlitzEmbedProps = {
  repo: string;
  file?: string;
  height?: string;
  view?: 'preview' | 'editor' | 'both';
};

export const StackBlitzEmbed = ({
  repo,
  file = 'README.md',
  height = '600px',
  view = 'preview',
}: StackBlitzEmbedProps) => {
  const src = `https://stackblitz.com/github/${repo}?embed=1&file=${file}&view=${view}`;

  return (
    <iframe
      src={src}
      width='100%'
      height={height}
      className='overflow-hidden'
      allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
      sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'></iframe>
  );
};
