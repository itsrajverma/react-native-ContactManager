import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,AsyncStorage,ScrollView } from 'react-native';

import { Card } from "native-base";
import { Entypo } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [data,setData] = useState([]);


    const getAllContact = async () => {

        let users = [];

        await AsyncStorage.getAllKeys()
            .then( keys =>{
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];

                        let contact = {
                            id : key,
                            value : JSON.parse(value)
                        }
                      //  console.log(contact)
                        users.push(contact)

                    });
                });
            })
            .catch(error=>{
                console.log(error);
            });
            setData(users);

            console.log(data)
    }

    useEffect(()=>{
        navigation.addListener('focus', () => {
            getAllContact();
        });
    },[navigation])



    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    let contact = item.value;
                    return(
                       <TouchableOpacity onPress={()=>{
                           navigation.navigate("View",{ id : item.id.toString() })
                       }} >
                           <Card style={styles.listItem}>
                               <View style={styles.iconContainer}>
                                   <Text style={styles.contactIcon}>
                                       {contact.fname[0].toUpperCase()}
                                   </Text>
                               </View>
                               <View style={styles.infoContainer}>
                                   <Text style={styles.infoText}>
                                       {contact.fname} {contact.lname}
                                   </Text>
                                   <Text style={styles.infoText}>{contact.phone}</Text>
                               </View>
                           </Card>
                       </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.id}
            />

            <TouchableOpacity
                style={styles.floatButton}
                onPress={() => {
                   navigation.navigate("Add")
                }}
            >
                <StatusBar style="auto" />
                <Entypo name="plus" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    listItem: {
        flexDirection: "row",
        padding: 20
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B83227",
        borderRadius: 100
    },
    contactIcon: {
        fontSize: 28,
        color: "#fff"
    },
    infoContainer: {
        flexDirection: "column"
    },
    infoText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2
    },
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: "#B83227",
        borderRadius: 100
    }
});
