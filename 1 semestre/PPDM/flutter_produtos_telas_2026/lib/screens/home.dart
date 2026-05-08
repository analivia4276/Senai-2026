import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children:[
          Center(child: Image.asset("assets/wepink.jpg"),
          ),
          Center(
            child: ElevatedButton(onPressed: () {}, child: Text('Entrar'))
          ),
        ],
      ),
    );
  }
}