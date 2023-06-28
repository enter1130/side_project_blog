<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" >
    <head>
        <title>{{ (isset($title))? $title:"Blog" }}</title>
        {{-- <link rel="icon" href="{!! asset('/assets/logo/logo 3.webp') !!}"/>
        <link rel="apple-touch-icon" href="{!! asset('/assets/logo/logo 3.webp') !!}"> --}}
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" media="all">
    </head>
    <body>
        @yield('Content')
        <script src="{{asset('js/app.js')}}" defer></script>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" defer></script>
    </body>
</html>