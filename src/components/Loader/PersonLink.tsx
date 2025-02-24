import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
  selectedSlug,
  setSelectedSlug,
}) => {
  const findPerson = (name: string | null) => {
    return people.find(pers => pers.name === name) || null;
  };

  const mother = findPerson(person.motherName);
  const father = findPerson(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          onClick={() => setSelectedSlug(person.slug)}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
            onClick={() => setSelectedSlug(mother.slug)}
          >
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={`/people/${father.slug}`}
            onClick={() => setSelectedSlug(father.slug)}
          >
            {father.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
