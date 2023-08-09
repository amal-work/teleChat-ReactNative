import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	Platform,
	Linking,
	PermissionsAndroid,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import GetLocation from 'react-native-get-location';
import Contacts from 'react-native-contacts';

import {
	PhoneActionSelector,
	PrimaryButton,
	ActionSheet,
	ListRow,
	Icon,
	Header,
	Input
} from 'components/ui';
import { OS } from 'consts';
import { Colors, Typography } from 'environment';
import { Transfer } from './Transfer';

interface PhoneNumbersProps {
	label: string;
	number: string;
}

interface ContactsProps {
	recordID: string;
	givenName: string;
	familyName: string;
	phoneNumbers: PhoneNumbersProps[];
}

interface Props {
	navigateToCamera?: () => void;
}

export function ChatOptions({ navigateToCamera }: Props) {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalConfirmLocation, setModalConfirmLocation] = useState(false);
	const [modalContacts, setModalContacts] = useState(false);
	const [phoneContacts, setPhoneContacts] = useState<ContactsProps[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		console.log('phoneContacts', phoneContacts);
	}, [phoneContacts]);

	async function requestPermissions() {
		try {
			let status = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_CONTACTS
			);
			console.log('status', status);
		} catch (e) {
			console.log('contacts permission', e);
		}
	}

	async function contactsGetAll(): Promise<any> {
		if (Platform.OS === OS.Android) {
			await requestPermissions();
		}
		return new Promise((res, rej) => {
			Contacts.getAll((err, contacts) => {
				if (err) {
					rej(err);
				} else {
					res(contacts);
				}
			});
		});
	}

	async function openContacts() {
		if (phoneContacts.length === 0) {
			const contacts = await contactsGetAll();
			setPhoneContacts(contacts);
		}
		setModalContacts(true);
	}

	const getLocation = async () => {
		try {
			let location = await GetLocation.getCurrentPosition({
				enableHighAccuracy: true,
				timeout: 15000
			});
			console.log(location);
			const scheme = Platform.select({
				ios: 'maps:0,0?q=',
				android: 'geo:0,0?q='
			});
			const latLng = `${location.latitudie},${location.longitude}`;
			const label = 'Custom Label';
			const url = Platform.select({
				ios: `${scheme}${label}@${latLng}`,
				android: `${scheme}${latLng}(${label})`
			});

			if (url) {
				Linking.openURL(url);
			}
			setModalConfirmLocation(false);
		} catch (error) {
			const { code, message } = error;
			console.warn(code, message);
		}
	};

	const getSelectedOption = async (type) => {
		try {
			const res = await DocumentPicker.pick({
				type: type
			});
			console.log(
				res.uri,
				res.type, // mime type
				res.name,
				res.size
			);
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				// User cancelled the picker, exit any dialogs or menus and move on
			} else {
				throw err;
			}
		}
	};

	return (
		<View style={{ paddingHorizontal: 54 }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					marginBottom: 32
				}}>
				<PhoneActionSelector
					icon={(icons) => icons.Arrows}
					iconBackgroundColor={Colors.blue[2]}
					iconColor={Colors.blue[6]}
					title='Transfer'
					iconSize={24}
					onPress={() => setModalVisibility(true)}
				/>
				<PhoneActionSelector
					icon={(icons) => icons.Picture}
					iconBackgroundColor={Colors.green[4]}
					title='Pictures'
					onPress={() => getSelectedOption(DocumentPicker.types.images)}
				/>
				<PhoneActionSelector
					icon={(icons) => icons.Camera}
					iconBackgroundColor={Colors.purple}
					title='Camera'
					onPress={navigateToCamera}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					paddingBottom: 15
				}}>
				<PhoneActionSelector
					icon={(icons) => icons.Document}
					iconBackgroundColor={Colors.orange}
					title='Document'
					onPress={() => getSelectedOption(DocumentPicker.types.allFiles)}
				/>
				<PhoneActionSelector
					icon={(icons) => icons.PhoneCall}
					iconBackgroundColor={Colors.babyBlue}
					title='Contact'
					onPress={openContacts}
				/>
				<PhoneActionSelector
					icon={(icons) => icons.Location}
					iconBackgroundColor={Colors.pink}
					title='Location'
					onPress={() => setModalConfirmLocation(true)}
				/>
			</View>
			<Transfer
				transactionType='Send'
				modalVisibility={modalVisibility}
				handleOnCloseModal={() => setModalVisibility(false)}
			/>
			<ActionSheet
				visible={modalConfirmLocation}
				onClose={() => setModalConfirmLocation(false)}>
				<Text
					style={{
						...Typography.header.medium,
						textAlign: 'center',
						paddingVertical: 40
					}}>
					Are you sure you want to send your current location?
				</Text>
				<PrimaryButton
					containerStyle={{ marginVertical: 20 }}
					title='Confirm Location'
					onPress={getLocation}
				/>
			</ActionSheet>
			<KeyboardAvoidingView behavior='position'>
				<ActionSheet
					visible={modalContacts}
					onClose={() => setModalContacts(false)}>
					<Header
						transparent
						leftComponent={
							<TouchableOpacity
								activeOpacity={0.5}
								style={{ flex: 1 }}
								onPress={() => setModalContacts(false)}>
								<Icon
									type={(icons) => icons.ArrowLeft}
									size={24}
									color={Colors.gray[4]}
								/>
							</TouchableOpacity>
						}
						title='Contacts'
					/>
					<View
						style={{
							marginHorizontal: 8,
							paddingVertical: 10
						}}>
						<View
							style={{
								height: 40,
								borderWidth: StyleSheet.hairlineWidth,
								borderRadius: 8,
								borderColor: Colors.gray[2],
								backgroundColor: '#8D919B2D',
								alignItems: 'center',
								flexDirection: 'row',
								paddingHorizontal: 7
							}}>
							<Icon
								type={(icons) => icons.Search}
								style={{ marginRight: 12 }}
							/>
							<Input
								containerStyle={{ marginBottom: 0 }}
								style={{ borderBottomWidth: undefined }}
								value={search}
								onChangeText={(searchText) => setSearch(searchText)}
							/>
						</View>
					</View>
					<FlatList
						data={phoneContacts.filter((contact) =>
							contact.givenName.includes(search)
						)}
						keyExtractor={({ recordID }) => recordID}
						renderItem={({ item }) => (
							<ListRow
								header={item.givenName + ' ' + item.familyName}
								description={item.phoneNumbers[0].number}
							/>
						)}
					/>
				</ActionSheet>
			</KeyboardAvoidingView>
		</View>
	);
}
