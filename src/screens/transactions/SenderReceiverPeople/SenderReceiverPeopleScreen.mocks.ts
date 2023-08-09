import uuid from 'uuid/v4';
import { Icons } from 'environment';

interface PeopleDataProps {
	id: string;
	name: string;
	nickname: string;
	icon: keyof typeof Icons;
}

export const PeopleData: PeopleDataProps[] = [
	{
		id: uuid(),
		name: 'Diego Simeone',
		nickname: '$simeone',
		icon: 'Person'
	},
	{
		id: uuid(),
		name: 'Arya Stark',
		nickname: '$goat',
		icon: 'Person'
	},
	{
		id: uuid(),
		name: 'Kyle Walker',
		nickname: '$pieters',
		icon: 'Person'
	},
	{
		id: uuid(),
		name: 'Anabelle Chuckie',
		nickname: '$chuck',
		icon: 'Person'
	}
];
