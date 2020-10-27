import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { characterDetailsURL } from "../utils/urls";
import { ALL_PEOPLE } from "../utils/queries";

import {
  Button,
  Card,
  Image,
  Message,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";

const CharacterList = () => {
  const { loading, error, data, fetchMore } = useQuery(ALL_PEOPLE, {
    variables: { after: null },
    notifyOnNetworkStatusChange: true,
  });
  if (error)
    return (
      <Message
        error
        header="There was some errors with your submission"
        content={JSON.stringify(error)}
      />
    );
  if (loading)
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </Segment>
    );

  return (
    <Fragment>
      {data.allPeople.people.map((character, i) => {
        const id = character.id;
        return (
          <Card.Group>
            <Card
              as={Link}
              to={characterDetailsURL(character.id)}
              fluid
              color={
                character.gender === "male"
                  ? "red"
                  : character.gender === "female"
                  ? "yellow"
                  : "orange"
              }
              header={`# ${i + 1} --  ${character.name}, born on  ${
                character.birthYear
              }`}
            />
          </Card.Group>
        );
      })}
      <br />
      <Button
        disabled={loading}
        secondary
        onClick={() => {
          const endCursor = data.allPeople.pageInfo.endCursor;
          fetchMore({
            variables: { after: endCursor },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              fetchMoreResult.allPeople.people = [
                ...prevResult.allPeople.people,
                ...fetchMoreResult.allPeople.people,
              ];
              return fetchMoreResult;
            },
          });
        }}
      >
        Load More
      </Button>
    </Fragment>
  );
};

export default CharacterList;
