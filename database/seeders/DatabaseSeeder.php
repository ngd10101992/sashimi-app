<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(100)->create(['password' => Hash::make('123456789')]);

        \App\Models\User::factory()->create([
            'name' => 'Gia Dat',
            'email' => 'ngd10101992@gmail.com',
            'password' => Hash::make('123456789'),
            'avatar' => '/images/avatar.jpg'
        ]);
    }
}
