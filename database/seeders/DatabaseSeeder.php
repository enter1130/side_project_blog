<?php

namespace Database\Seeders;

use Faker\Factory;
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
        $faker = Factory::create();
        DB::table('users')->insert([
            'username'=>'admin',
            'email'=>'admin@demo.com',
            'password'=>Hash::make('admin'),
            'description'=>$faker->realText(),
            'avatar'=>'https://yt3.ggpht.com/yti/AHyvSCAyZHyee0Btp7f05pbKkV0XJp1TaucZVoGOJE0eaw=s108-c-k-c0x00ffffff-no-rj',
            'email_verified_at'=>Carbon::now(),
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);

        DB::table('users')->insert([
            'username'=>'user',
            'email'=>'user@demo.com',
            'password'=>Hash::make('user'),
            'description'=>$faker->realText(),
            'avatar'=>'https://lh3.googleusercontent.com/ogw/AGvuzYZh1I1fNTSby9BSVSST4BbSNELvyyzxCe5uYWjaZA=s32-c-mo',
            'email_verified_at'=>Carbon::now(),
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);

        for ($i=1; $i < 9; $i++) {
            DB::table('blog')->insert([
                'title'=>'標題'.$i,
                'content'=>$faker->realText(),
                'date'=>$faker->date(),
                'tag'=>'[{"id":1},{"id":2}]',
                'cover'=>$faker->imageUrl(640, 480, 'animals', true),
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now(),
            ]);
        }

        for ($i=1; $i < 3; $i++) { 
            DB::table('tag')->insert([
                'name'=>'標籤_'.$i,
                'color'=>'#' . dechex(rand(0,10000000)),
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now(),
            ]);
        }
        
    }
}
