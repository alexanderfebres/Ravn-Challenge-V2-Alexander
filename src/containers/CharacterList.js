import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { characterDetailsURL } from "../utils/urls";
import { ALL_PEOPLE } from "../utils/queries";

import Loading from "./components/Loading";

import { Button, Card, Message } from "semantic-ui-react";

const CharacterList = () => {
  const { loading, error, data, fetchMore } = useQuery(ALL_PEOPLE, {
    variables: {
      after: null},
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
  if (loading) return <Loading />;

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
