<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Logs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:log';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command log description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        \Log::debug('Run command log !!!!');
    }
}
