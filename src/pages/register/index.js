import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import theme from '../../theme';
import { Input, Block } from 'galio-framework';
import { Button } from 'galio-framework';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import config from '../../config';

const schema = yup.object({
    nome: yup.string().required("Informe o título do artigo."),
    autor: yup.string().required("Informe o autor do artigo."),
    descricao: yup.string().required("Informe a descrição do artigo."),
})

export function Register({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function register(data) {
        fetch(config.APIURL + "/inserir_artigo",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (res.status == 200) {
                    alert("Artigo inserido com sucesso.");
                    navigation.navigate("Artigos");
                }
                return;
            })
            .catch(function (error) {
                alert("Falha ao inserir " + error);
                throw error;
            });
    }

    return (
        <View style={styles.container}>
            <Block style={styles.inputGroup}>
                <Text>Título:</Text>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.nome && <Text style={styles.labelError}>{errors.nome?.message}</Text>}
            </Block>
            <Block style={styles.inputGroup}>
                <Text>Descrição:</Text>
                <Controller
                    control={control}
                    name="descricao"
                    render={({ field: { onChange, value } }) => (
                        <Input style={styles.textArea}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.descricao && <Text style={styles.labelError}>{errors.descricao?.message}</Text>}
            </Block>
            <Block style={styles.inputGroup}>
                <Text>Nome do Autor:</Text>
                <Controller
                    control={control}
                    name="autor"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.autor && <Text style={styles.labelError}>{errors.autor?.message}</Text>}
            </Block>

            <Button color="info" shadowless onPress={handleSubmit(register)}>
                Cadastrar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLORS.WHITE,
        paddingTop: 50
    },
    inputGroup: {
        paddingTop: 15,
    },
    labelError: {
        color: '#ff375b',
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    textArea: {
        width: '100%',
        height: 200,
        textAlignVertical: 'top'
    }
})