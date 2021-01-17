/* Libraries */
import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform,
    ScrollView,
    Dimensions,
    TextInput,
    ImageBackground,
    StatusBar,
    Animated,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// ICONS IMPORT
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// THEME IMPORT
import * as theme from '../../Constants/theme';

// HELPER IMPORT
import helper from '../../Constants/helper';

// CONSTANTS
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ['New arrivals', 'Clothes', 'Shoes', 'Handbags', 'Trends'],
            selectedCatogoryIndex: 0,
            products: [
                {
                    name: 'Backpack',
                    images: [require('../../../assets/images/bag.png')],
                    price: '$299',
                },
                {
                    name: 'Umbrella',
                    images: [require('../../../assets/images/umbrella.png')],
                    price: '$249',
                },
                {
                    name: 'Jacket',
                    images: [require('../../../assets/images/leather_jacket.png')],
                    price: '$499',
                },
                {
                    name: 'Shoes',
                    images: [require('../../../assets/images/shoes.png')],
                    price: '$199',
                },
                {
                    name: `Women's Jacket`,
                    images: [require('../../../assets/images/ladies_jacket.png')],
                    price: '$499',
                },
                {
                    name: 'Cap',
                    images: [require('../../../assets/images/cap.png')],
                    price: '$99',
                },
            ],
        };
    }

    static navigationOptions = {
        headerShown: false,
    };

    // LIFECYCLE METHODS
    componentDidMount = () => {};
    // END LIFECYCLE METHODS

    // UTILITY FUNCTIONS
    // END UTILITY FUNCTIONS

    // FUNCTIONAL COMPONENTS
    Header = () => {
        return (
            <View style={{...styles.header}}>
                <Ionicons name={'chevron-back'} size={EStyleSheet.value('25rem')} color={'black'} />
                <Text style={{fontSize: EStyleSheet.value('16rem'), fontWeight: '600'}}>Shopping</Text>
                <FontAwesome name={'sliders'} size={EStyleSheet.value('25rem')} color={'black'} />
            </View>
        );
    };

    Separator = () => {
        return <View style={{...styles.separator}} />;
    };

    Product = ({item, index}) => {
        // STATE
        const [bookmarked, setBookmarked] = useState(null);
        const [quantity, setQuantity] = useState(0);
        const [addToCartContHeight, setAddToCartContHeight] = useState(new Animated.Value(EStyleSheet.value('30rem')));

        return (
            <View
                style={{
                    flex: 1,
                    height: EStyleSheet.value('260rem'),
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                    justifyContent: 'space-evenly',
                    padding: theme.appDims.boundary,
                }}>
                <Image source={item.images[0]} style={{height: EStyleSheet.value('130rem'), aspectRatio: 1, resizeMode: 'contain', alignSelf: 'center'}} />
                <View>
                    <Text style={{fontSize: EStyleSheet.value('16rem'), fontWeight: '600'}}>{item.price}</Text>
                    <Text style={{fontSize: EStyleSheet.value('14rem'), fontWeight: '400', color: 'grey'}}>{item.name}</Text>
                </View>

                {/* BOOKMART BUTTON */}
                <TouchableOpacity
                    style={{position: 'absolute', top: EStyleSheet.value('10rem'), right: EStyleSheet.value('10rem')}}
                    onPress={() => setBookmarked(!bookmarked)}>
                    <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={EStyleSheet.value('25rem')} color={'black'} />
                </TouchableOpacity>

                {/* ADD TO CART */}
                <Animated.View
                    style={{
                        width: EStyleSheet.value('40rem'),
                        height: addToCartContHeight,
                        backgroundColor: '#2C2E33',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        borderTopLeftRadius: EStyleSheet.value('20rem'),
                        alignItems: 'center',
                    }}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: '6%',
                            opacity: addToCartContHeight.interpolate({
                                inputRange: [EStyleSheet.value('40rem'), EStyleSheet.value('100rem')],
                                outputRange: [0, 1],
                            }),
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                quantity > 0 && setQuantity(quantity - 1);
                                if (quantity == 1) {
                                    helper.startAnimation(addToCartContHeight, EStyleSheet.value('30rem'));
                                }
                            }}>
                            <MaterialCommunityIcons name={'minus'} size={EStyleSheet.value('22rem')} color={'white'} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.Text
                        style={{
                            ...styles.addToCartLabels,
                            position: 'absolute',
                            top: '50%',
                            transform: [{translateY: EStyleSheet.value('-12rem')}],
                            opacity: addToCartContHeight.interpolate({
                                inputRange: [EStyleSheet.value('40rem'), EStyleSheet.value('100rem')],
                                outputRange: [0, 1],
                            }),
                        }}>
                        {quantity}
                    </Animated.Text>
                    <TouchableOpacity
                        onPress={() => {
                            setQuantity(quantity + 1);
                            helper.startAnimation(addToCartContHeight, EStyleSheet.value('100rem'));
                        }}
                        style={{position: 'absolute', bottom: '6%'}}>
                        <MaterialCommunityIcons name={'plus'} size={EStyleSheet.value('22rem')} color={'white'} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };
    // END FUNCTIONAL COMPONENTS

    // RENDERING FUNCTIONS

    render() {
        const {Header, Separator, Product} = this;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <Header />
                <Separator />

                {/* CATEGORIES */}
                <View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{paddingHorizontal: theme.appDims.boundary, paddingVertical: EStyleSheet.value('10rem')}}
                        showsHorizontalScrollIndicator={false}>
                        {this.state.categories.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={{marginRight: EStyleSheet.value('16rem')}}
                                    onPress={() => this.setState({selectedCatogoryIndex: index})}>
                                    <Text
                                        style={{
                                            fontSize: EStyleSheet.value('14rem'),
                                            fontWeight: this.state.selectedCatogoryIndex == index ? '600' : '400',
                                            color: this.state.selectedCatogoryIndex == index ? 'black' : 'grey',
                                        }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                    <Separator />
                </View>

                {/* PRODUCTS */}
                <FlatList
                    data={this.state.products}
                    renderItem={({item, index}) => <Product item={item} index={index} />}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }
    // END RENDERING FUNCTIONS
}

const styles = EStyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.appDims.boundary,
    },
    separator: {
        width: '100%',
        height: '0.5rem',
        backgroundColor: 'lightgrey',
    },
    addToCartLabels: {
        fontSize: '20rem',
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Home;
