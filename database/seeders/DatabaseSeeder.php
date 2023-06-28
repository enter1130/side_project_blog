<?php

namespace Database\Seeders;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username'=>'admin',
            'email'=>'admin@ncku.org.tw',
            'password'=>Hash::make('admin'),
            'avatar'=>'https://yt3.ggpht.com/yti/AHyvSCAyZHyee0Btp7f05pbKkV0XJp1TaucZVoGOJE0eaw=s108-c-k-c0x00ffffff-no-rj',
            'email_verified_at'=>Carbon::now(),
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);

        for ($i=0; $i < 9; $i++) { 
            DB::table('blog')->insert([
                'title'=>'標題'.$i,
                'content'=>'內容'.$i,
                'date'=>Carbon::now()->toDateString(),
                'cover'=>'https://yt3.ggpht.com/yti/AHyvSCAyZHyee0Btp7f05pbKkV0XJp1TaucZVoGOJE0eaw=s108-c-k-c0x00ffffff-no-rj',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now(),
            ]);
        }
        
    }
}
