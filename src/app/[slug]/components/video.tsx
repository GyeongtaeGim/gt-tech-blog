import { ComponentProps } from 'react';

interface VideoProps extends ComponentProps<'video'> {}

export default function Video(props: VideoProps) {
  return <video controls {...props} />;
}
