import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage,
    Alert
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

export default function EditContactScreen({ navigation,route }) {

    const [ fname,setFname ] = useState('NA');
    const [ lname,setLname ] = useState('NA');
    const [ phone,setPhone ] = useState('NA');
    const [ email,setEmail ] = useState('NA');
    const [ address,setAddress ] = useState('NA');
    const [ key,setKey ] = useState('NA');



    const getContact = async key =>{
        await AsyncStorage.getItem(key)
            .then(contactString =>{
                let contact = JSON.parse(contactString);
                setAddress(contact.address);
                setFname(contact.fname);
                setLname(contact.lname);
                setPhone(contact.phone);
                setEmail(contact.email);

                console.log(contact);

            })


    }


    const updateContact = async key =>{
        if (fname !== "" && lname !== "" && phone !== "" && email !== "" && address !== ""
        ) {
            let contact = {
                fname : fname,
                lname : lname,
                email : email,
                phone : phone,
                address : address
            }
            console.log(contact);
            console.log(key);
            console.log(JSON.stringify(contact))
            await AsyncStorage.setItem(key, JSON.stringify(contact))
                .then(() => {
                  navigation.goBack()
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };




    useEffect(()=>{
        navigation.addListener('focus', () => {
            const { id } = route.params;
            setKey(id);
            getContact(id)
        });
    },[navigation])


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <Form>
                    <Item style={styles.inputItem}>
                        <Label>First Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={fname => setFname({ fname })}
                            value={fname.toString()}
                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Label>Last Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={lname => setLname({ lname })}
                            value={lname.toString()}
                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Label>Phone</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={phone => setPhone({ phone })}
                            value={phone.toString()}
                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={email => setEmail({ email })}
                            value={email.toString()}
                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Label>Address</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={address => setAddress({ address })}
                            value={address}
                        />
                    </Item>
                </Form>
                <Button
                    full
                    rounded
                    style={styles.button}
                    onPress={() => {
                        updateContact(key);
                    }}
                >
                    <Text style={styles.buttonText}>Update</Text>
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10
    },
    inputItem: {
        margin: 10
    },
    button: {
        backgroundColor: "#B83227",
        marginTop: 40
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
});