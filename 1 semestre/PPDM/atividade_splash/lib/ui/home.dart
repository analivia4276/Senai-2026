import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'splash.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  String nome = '';
  String idade = '';

  @override
  void initState() {
    super.initState();
    obterDados();
  }

  Future<void> obterDados() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      if (prefs.containsKey('nome')) {
        nome = json.decode(prefs.getString('nome')!);
      }
      if (prefs.containsKey('idade')) {
        idade = json.decode(prefs.getString('idade')!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(nome),
        backgroundColor: Colors.blueGrey,
      ),
      body: Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,          
            children: [
            Text("Bem vindo(a) $nome"),
            Text("Idade: $idade anos"),
            ElevatedButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const SplashScreen()),
                );
              },
              child: const Text('Voltar'),
            ),
          ],
        ),
      ),
    );
  }
}