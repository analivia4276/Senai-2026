import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
      home: const SplashScreen(),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();

    _controller =
        AnimationController(vsync: this, duration: const Duration(seconds: 2));

    _opacity = Tween(begin: 0.0, end: 1.0).animate(_controller);
    _scale = Tween(begin: 0.7, end: 1.0).animate(_controller);

    _controller.forward();

    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const HomePage()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FadeTransition(
        opacity: _opacity,
        child: ScaleTransition(
          scale: _scale,
          child: const Center(
            child: Text(
              "Funcionários",
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ),
    );
  }
}


class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List funcionarios = [];
  int index = 0;

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {
    String data =
        await rootBundle.loadString('assets/mockup/funcionarios.json');

    setState(() {
      funcionarios = json.decode(data);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (funcionarios.isEmpty) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    var funcionario = funcionarios[index];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Funcionários"),
        centerTitle: true,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // DROPDOWN
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 30),
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(30),
            ),
            child: DropdownButton<String>(
              value: funcionario['nome'],
              isExpanded: true,
              underline: const SizedBox(),
              items: funcionarios.map<DropdownMenuItem<String>>((f) {
                return DropdownMenuItem(
                  value: f['nome'],
                  child: Text(f['nome']),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  index =
                      funcionarios.indexWhere((f) => f['nome'] == value);
                });
              },
            ),
          ),

          const SizedBox(height: 30),

          // CARD
          Container(
            padding: const EdgeInsets.all(20),
            margin: const EdgeInsets.symmetric(horizontal: 30),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: const [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 10,
                )
              ],
            ),
            child: Column(
              children: [
                CircleAvatar(
                  radius: 50,
                  backgroundImage:
                      NetworkImage(funcionario['avatar']),
                ),
                const SizedBox(height: 10),
                Text(
                  funcionario['nome'],
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Text(funcionario['cargo']),
                Text("R\$ ${funcionario['salario']}"),
                Text("Admissão: ${funcionario['dataContratacao']}"),
              ],
            ),
          ),

          const SizedBox(height: 30),

          // BOTÕES
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: index > 0
                    ? () => setState(() => index--)
                    : null,
                child: const Text("Anterior"),
              ),
              ElevatedButton(
                onPressed: index < funcionarios.length - 1
                    ? () => setState(() => index++)
                    : null,
                child: const Text("Próximo"),
              ),
            ],
          )
        ],
      ),
    );
  }
}