import React from "react";

import { Image, Segment, Dimmer, Loader } from "semantic-ui-react";

export default function Loading() {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Image src="/images/wireframe/short-paragraph.png" />
    </Segment>
  );
}
