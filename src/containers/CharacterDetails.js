import React, { Fragment } from "react";

import { useQuery } from "@apollo/client";
import { PERSON_DETAILS } from "../utils/queries";

import Loading from "./components/Loading";

import { Item, Message, Grid, Header } from "semantic-ui-react";

const CharacterDetails = (props) => {
  const id = props.match.params.characterID;
  const { loading, error, data } = useQuery(PERSON_DETAILS, {
    variables: { ID: id },
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
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header size="large" color="purple">
              Character Info
            </Header>

            <Item.Group>
              <Item key={data.person.id}>
                <Item.Content>
                  <Item.Header as="a">{data.person.name}</Item.Header>
                  <Item.Meta as="h4">
                    Birth Date: {data.person.birthYear}
                  </Item.Meta>
                  <Item.Description>
                    From: {data.person.homeworld.name}
                  </Item.Description>
                  <Item.Description>
                    Gender: {data.person.gender}
                  </Item.Description>
                  <Item.Description>
                    Hair color: {data.person.hairColor}
                  </Item.Description>
                  <Item.Description>
                    Eye color: {data.person.eyeColor}
                  </Item.Description>
                  <Item.Description>
                    height : {data.person.height}
                  </Item.Description>
                  {data.person.mass && (
                    <Item.Description>
                      mass: {data.person.mass}
                    </Item.Description>
                  )}
                  {data.person.species && (
                    <Item.Description>
                      Specie: {data.person.species.name}
                    </Item.Description>
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>

          <Grid.Column width={8}>
            <Header size="large" color="purple">
              StarShip Info
            </Header>
            {data.person.starshipConnection.starships.length === 0 && (
              <Header as="h4">
                No starship information available for this character
              </Header>
            )}
            {data.person.starshipConnection.starships.map((ship) => {
              return (
                <Item.Group>
                  <Item key={ship.id}>
                    <Item.Content>
                      <Item.Header as="a">{ship.name}</Item.Header>
                      <Item.Meta as="h4">{ship.model}</Item.Meta>
                      <Item.Description>Crew: {ship.crew}</Item.Description>
                      <Item.Description>
                        Passengers: {ship.passengers}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default CharacterDetails;
