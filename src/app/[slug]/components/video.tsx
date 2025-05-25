import { ComponentProps } from 'react';

type VideoProps = ComponentProps<'video'>;

export default function Video(props: VideoProps) {
  return <video controls {...props} />;
}
