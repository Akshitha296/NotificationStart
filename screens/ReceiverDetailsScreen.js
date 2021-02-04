import React from 'react';
import { View, Text, Card } from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam('details')['user_id'],
            requestId: this.props.navigation.getParam('details')['request_id'],
            bookName: this.props.navigation.getParam('details')['book_name'],
            reasonForRequesting: this.props.navigation.getParam('details')['reason_to_request'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId:'',
        }
    }

    getReceiverDetails(){
        db.collection('users').where('email_id', '==', this.state.receiverId).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        receiverName: doc.data().first_name,
                        receiverContact: doc.data().contact,
                        receiverAddress: doc.data().address,
                    })
                })
            }
        )
        //db.collection('')
    }
    render(){
        return(
            <View>
                <View>
                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>
                            Name: {this.state.receiverName}
                        </Text>
                    </Card>

                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>
                            Contact: {this.state.receiverContact}
                        </Text>
                    </Card>

                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>
                            Address: {this.state.receiverContact}
                        </Text>
                    </Card>
                </View>

                <View>
                    {this.state.receiverId !== this.state.userId
                    ? (<TouchableOpacity>
                        <Text>
                            I want to donate.
                        </Text>
                      </TouchableOpacity>
                      ) : null
                    }
                </View>
            </View>
        )
    }
}