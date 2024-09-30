import React, { useState} from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { evaluate } from 'mathjs';

export default function App() {
  const [priVal, setPriVal] = useState('');
  const [segVal, setSegVal] = useState('');
  const [result, setResult] = useState('');

  const calculo = (operacao) => {
    try {
      const v1 = parseFloat(priVal);
      const v2 = parseFloat(segVal);

      if (isNaN(v1) || isNaN(v2)) {
        setResult("Digite valores reais!")
        return;
      }

      let expressao;

      switch (operacao) {
        case '+':
          expressao = `${v1} + ${v2}`;
          break;
        case '-':
          expressao = `${v1} - ${v2}`;
          break;
        case '*':
          expressao = `${v1} * ${v2}`;
          break;
        case '/':
          if (v2 == 0){
            setResult("Não da pra dividir por 0")
            return;
          }
          expressao = `${v1} / ${v2}`;
          break;

        default:
          return;
      }

      const res = evaluate(expressao)
      setResult(res.toString());
    } catch (error) {
      setResult("Erro no cálculo");
    }
  };

    // Função para limpar os campos
    const limparCampos = () => {
      setPriVal('');
      setSegVal('');
      setResult('');
    };

  return (
    <View style={styles.container}>

    <Text style={styles.title}>
        Calculadora do Vinibiel
    </Text>

    <TextInput
    style={styles.input}
    placeholder='Valor 1'
    value={priVal}
    onChangeText={(text) => setPriVal(text)}
    keyboardType='numeric'
    />

    <TextInput
    style={styles.input}
    placeholder='Valor 2'
    value={segVal}
    onChangeText={(text) => setSegVal(text)}
    keyboardType='numeric'
    />

    <Text style={styles.title}> Escolha a operação </Text>

    <View style={styles.buttonRow}>
      <Button title="+" onPress={() => calculo('+')} />
      <Button title="-" onPress={() => calculo('-')} />
      <Button title="*" onPress={() => calculo('*')} />
      <Button title="/" onPress={() => calculo('/')} />
    </View>

    <Button title="Limpar" onPress={limparCampos} color="red" />

    <Text style={styles.result}>Resultado: {result} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  result: {
    fontSize: 22,
    textAlign: 'center',
    color: 'green',
  },
  title: {
    fontSize: 18,
    margin: 35
  }
});
