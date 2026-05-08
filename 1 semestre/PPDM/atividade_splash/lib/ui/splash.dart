import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _posicaoController;
  late AnimationController _opacidadeController;
  double _top = -300; 
  double _opacity = 0.0;
  String nome = '';
  String idade = '';

  @override
  void initState() {
    super.initState();

    _posicaoController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..addListener(() {
      setState(() {
        _top = -300 + (_posicaoController.value * 230);
      });
    });

    _opacidadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    )..addListener(() {
      setState(() {
        _opacity = _opacidadeController.value;
      });
    });

    _posicaoController.forward();

    Timer(const Duration(seconds: 2), () {
      _opacidadeController.forward();
    });
  }

  Future<void> salvarDados() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('nome', json.encode(nome));
    await prefs.setString('idade', json.encode(idade));
    irParaHome();
  }

  void irParaHome() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const Home()),
    );
  }

  @override
  void dispose() {
    _posicaoController.dispose();
    _opacidadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [

          Transform.translate(
            offset: Offset(0, _top),
            child: Opacity(
              opacity: _opacity,
              child: Center(
                child: Image.asset(
                  'assets/logo.png',
                  height: 120,
                ),
              ),
            ),
          ),

          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                const SizedBox(height: 200),

                ElevatedButton(
                  onPressed: salvarDados,
                  child: const Text("Entrar"),
                ),

                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: TextField(
                    decoration:
                        const InputDecoration(labelText: "Digite seu nome"),
                    onChanged: (value) {
                      nome = value;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: TextField(
                    decoration:
                        const InputDecoration(labelText: "Digite sua idade"),
                    keyboardType: TextInputType.number,
                    onChanged: (value) {
                      idade = value;
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}