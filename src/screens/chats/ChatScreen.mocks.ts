import { Icons } from 'environment';
import uuid from 'uuid/v4';

interface ChatListDataProps {
	id: string;
	icon: keyof typeof Icons;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	messagesCounter: string;
}

export const ChatListData: ChatListDataProps[] = [
	{
		id: uuid(),
		icon: 'Person',
		name: 'Jasmine Walker',
		lastMessage: 'Please call me up right away. No mo ..',
		lastMessageTime: 'Now',
		messagesCounter: '32'
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Adegoke Damola',
		lastMessage: 'Please call me up right away. No mo ..',
		lastMessageTime: 'Now',
		messagesCounter: '1'
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Danny Oyekan',
		lastMessage: 'Please call me up right away. No mo ..',
		lastMessageTime: 'Now',
		messagesCounter: '4'
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Christian Josephs',
		lastMessage: 'Request: $500.83',
		lastMessageTime: '08:56',
		messagesCounter: '32'
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Wurld Child',
		lastMessage: 'Wurld Child',
		lastMessageTime: '08:32',
		messagesCounter: '12'
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Jermain Cole',
		lastMessage: 'So much money I don’t know who stole f …',
		lastMessageTime: 'Yesterday, 11:09',
		messagesCounter: ''
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Jake Fagan',
		lastMessage: 'I take very nice photographs',
		lastMessageTime: 'Mon, 23:45',
		messagesCounter: ''
	},
	{
		id: uuid(),
		icon: 'Person',
		name: 'Jasmine Walker',
		lastMessage: 'Please call me up right away. No mo ..',
		lastMessageTime: 'Now',
		messagesCounter: '32'
	}
];
