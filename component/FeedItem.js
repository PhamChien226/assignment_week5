import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

export default class FeedItem extends Component {
    onPressReadMore = () => {
        const {
            item: { url }
        } = this.props
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
    render() {
        const {
            item: { title, urlToImage, publishedAt, source, content }
        } = this.props
        return (
            <View style={styles.container}>
                <Card title={title} image={{ uri: urlToImage }}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Source</Text>
                        <Text style={styles.info}>{source.name}</Text>
                    </View>
                    <Text style={{ marginBottom: 10 }}>{content}</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Published</Text>
                        <Text style={styles.info}>
                            {moment(publishedAt).format('LLL')}
                        </Text>
                    </View>
                    <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={this.onPressReadMore} />
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    header: {
        height: 30,
        width: '100%',
        backgroundColor: 'pink'
    },
    row: {
        flexDirection: 'row'
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginRight: 10,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 16,
        color: 'grey'
    }
})
