<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Errors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:error';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command error description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        \Log::debug('Run command error !!!!');
    }
}
