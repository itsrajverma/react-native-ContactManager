import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Linking,Platform,Alert,AsyncStorage } from 'react-native';

import { Card,CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function ViewContactScreen({ navigation,route }) {

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


    const smsAction = phone =>{
        let phoneNumber = phone;
        phoneNumber = `sms:${phone}`;

        Linking.canOpenURL(phoneNumber)
            .then(supported=>{
                 if(!supported){
                     Alert.alert("Phone Number is not available..")
                 }else{
                     return Linking.openURL(phoneNumber);
                 }
            })
            .catch(error=>{
                console.log(error)
            })

    }

    const callAction = phone =>{
        let phoneNumber  = phone;
        if(Platform.OS !== 'android'){
            phoneNumber = `telpromt:${phone}`;
        }else{
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert("Phone number is not available");
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const editContact = key =>{
        navigation.navigate("Edit",{id : key});
    }

    const deleteContact = key =>{
        Alert.alert("Delete Contact ?", `${fname} ${lname}`,[{
            text :"Cancel",
            onPress: ()=> console.log("Canceled")
        },{
            text: "OK",
            onPress : async () =>{
                await AsyncStorage.removeItem(key)
                    .then(()=>{
                        navigation.goBack();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }])
    }

    useEffect(()=>{
        navigation.addListener('focus', () => {
            const { id } = route.params;
            setKey(id);
            getContact(id)
        });
    },[navigation])


    return (
        <ScrollView style={styles.container}>
            <View style={styles.contactIconContainer}>
                <Text style={styles.contactIcon}>
                    { fname[0].toUpperCase()}
                </Text>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                        { fname} { lname}
                    </Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>Phone</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={styles.infoText}>{ phone }</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>email</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={styles.infoText}>{email}</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>Address</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={styles.infoText}>{address}</Text>
                    </CardItem>
                </Card>
            </View>

            <Card style={styles.actionContainer}>
                <CardItem style={styles.actionButton} bordered>
                    <TouchableOpacity
                        onPress={() => {
                                smsAction(phone);
                        }}
                    >
                        <Entypo name="message" size={50} color="#B83227" />
                    </TouchableOpacity>
                </CardItem>

                <CardItem style={styles.actionButton} bordered>
                    <TouchableOpacity
                        onPress={() => {
                            callAction(phone)
                        }}
                    >
                        <Entypo name="phone" size={50} color="#B83227" />
                    </TouchableOpacity>
                </CardItem>
            </Card>

            <Card style={styles.actionContainer}>
                <CardItem style={styles.actionButton} bordered>
                    <TouchableOpacity
                        onPress={() => {
                            editContact(key)
                        }}
                    >
                        <Entypo name="edit" size={50} color="#B83227" />
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                </CardItem>

                <CardItem style={styles.actionButton} bordered>
                    <TouchableOpacity
                        onPress={() => {
                            deleteContact(key)
                        }}
                    >
                        <Entypo name="trash" size={50} color="#B83227" />
                    </TouchableOpacity>
                </CardItem>
            </Card>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    contactIconContainer: {
        height: 200,
        backgroundColor: "#B83227",
        alignItems: "center",
        justifyContent: "center"
    },
    contactIcon: {
        fontSize: 100,
        fontWeight: "bold",
        color: "#fff"
    },
    nameContainer: {
        width: "100%",
        height: 70,
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        position: "absolute",
        bottom: 0
    },
    name: {
        fontSize: 24,
        color: "#000",
        fontWeight: "900"
    },
    infoText: {
        fontSize: 18,
        fontWeight: "300"
    },
    actionContainer: {
        flexDirection: "row"
    },
    actionButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    actionText: {
        color: "#B83227",
        fontWeight: "900"
    },
    infoContainer: {
        flexDirection: "column"
    }
});
