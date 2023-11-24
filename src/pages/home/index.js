import React, { useEffect, useState } from "react";
import { Card, Block, Icon } from 'galio-framework';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from "react-native"
import theme from '../../theme';
import config from '../../config';

const { width } = Dimensions.get('screen');

export function Home() {

    const [artigos, setArtigos] = useState([]);
    const images = ["1532938911079-1b06ac7ceec7",
        "1535914254981-b5012eebbd15",
        "1587557983735-f05198060b52",
        "1562243061-204550d8a2c9",
        "1587854692152-cbe660dbde88",
        "1617881770125-6fb0d039ecde"]

    useEffect(() => { fetchData() }, []);

    const fetchData = () => {
        fetch(config.APIURL + "/selecionar_artigos",
            {
                method: "GET"
            })
            .then((response) => response.json())
            .then((json) => setArtigos(json))
            .catch(function (error) {
                alert("Falha ao consultar o servidor " + error);
                throw error;
            })
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const renderArtigo = ({ item, index }) => {
        return (
            <Block>
                <Block flex style={styles.news}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-' + images[getRandomInt(0, 5)] + '?fit=crop&w=1300&q=80' }}
                        style={styles.articleImage}
                    />
                    <Block style={styles.article}>
                        <Text h4 style={styles.articleTitle}>
                            {item.nome}
                        </Text>
                        <Text muted style={[styles.text, { marginVertical: theme.SIZES.BASE * 1.3 }]}>
                            {item.descricao}
                        </Text>
                        <Text>
                            Autor(a): {item.autor}
                        </Text>
                    </Block>
                </Block>
            </Block>
        )
    }

    return (
        <Block flex style={styles.container}>
            <FlatList
                data={artigos}
                renderItem={renderArtigo}
                keyExtractor={(item, index) => index.toString()}
            />
        </Block >
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.WHITE,
        alignItems: 'center',
        paddingTop: 50
    },
    article: {
        marginTop: theme.SIZES.BASE * 1.75,
    },
    articleImage: {
        borderRadius: theme.SIZES.BASE / 2,
        height: theme.SIZES.BASE * 13.75,
    },
    news: {
        marginTop: theme.SIZES.BASE / 2,
        paddingBottom: theme.SIZES.BASE * 2,
        justifyContent: 'flex-start',
        paddingHorizontal: theme.SIZES.BASE,
    },
    button: {
        width: theme.SIZES.BASE * 2,
        borderColor: 'transparent',
    },
    author: {
        backgroundColor: theme.COLORS.WHITE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        elevation: theme.SIZES.BASE,
    },
    text: {
        fontWeight: '400',
        fontSize: theme.SIZES.FONT * 0.875,
        lineHeight: theme.SIZES.BASE * 1.25,
        letterSpacing: 0.3,
        marginBottom: theme.SIZES.BASE,
    },
    articleTitle: {
        fontWeight: '700'
    }
});
