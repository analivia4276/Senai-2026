import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get theme {
    return ThemeData.light().copyWith(
      scaffoldBackgroundColor: const Color.fromARGB(255, 214, 223, 243),
      appBarTheme: AppBarTheme(
        backgroundColor: const Color.fromARGB(255, 46, 89, 122),
        titleTextStyle: TextStyle(fontSize: 20),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color.fromARGB(255, 46, 78, 122),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(30),
          ),
        ),
      ),
    );
  }
}