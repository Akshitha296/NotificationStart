import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class MyDonationScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allDonations: [],
        }
    }

    componentDidMount(){
        this.getAllDonations()
    }

    getAllDonations = () =>{
        console.log(this.state.userId)
        this.requestRef = db.collection('all_donations').where("Donor_Id", '==', this.state.userId).onSnapshot(
            (snapshot) => {
                var allDonations = snapshot.docs.map(document =>{document.data()})
                console.log(allDonations)
                this.setState({
                    allDonations: allDonations
                })
            }
        )
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({item, i}) =>{
        return(
          <ListItem
            key = {i}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title
                style = {{ color: 'black', fontWeight: 'bold' }}
            >
                {item.book_name}
            </ListItem.Title>

            <ListItem.Subtitle
              style = {{color: 'green'}}
            >
              {"Requested By: " + item.requested_by + '\n status: ' + item.request_status}
            </ListItem.Subtitle>

            <ListItem.LeftElement
                style = {{color: 'red',}}
            >
                {<Icon name = 'book' 
                       color = 'black'
                />}
            </ListItem.LeftElement>

            <ListItem.RightElement>
                <TouchableOpacity style = {{width: 50, height: 20, color: 'red'}}>
                    <Text style = {{fontSize: 5, fontStyle: 'bold', alignItems: 'center', justifyContent: 'center'}}>
                        Send Book
                    </Text>
                </TouchableOpacity>
            </ListItem.RightElement>

          </ListItem.Content>

          </ListItem>
        )
      }

    render(){
        return(
            <View style = {{flex: 1,}}>
                <View style = {{flex: 1,}}>
                    {this.state.allDonations.length === 0 
                    ? (<View><Text>List Of Book Donations</Text></View>) 
                    : (<FlatList
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.allDonations}
                            renderItem ={this.renderItem}
                      />)
                }
                </View>
            </View>
        )
    }
}