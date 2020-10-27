import React from "react";
import {
  Container,
  Icon,
  Grid,
  Header,
  Menu,
  Segment,
} from "semantic-ui-react";

import { Link, withRouter } from "react-router-dom";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Icon name="rocket"></Icon>
              Ravn GraphQL Code Challenge
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="/">Characters</Link>
            </Menu.Item>
          </Container>
        </Menu>

        <Container text style={{ marginTop: "7em" }}>
          {this.props.children}
          <br /> <br />{" "}
        </Container>

        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Una Nueva Esperanza{" "}
                  </Header>
                  <p>“La fuerza estará ya contigo… siempre.”</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Layout);
