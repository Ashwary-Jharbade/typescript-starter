import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = `
    ######################################################
    #       Comrade, we are publishing you changes       #
    ######################################################
`;

rl.question(prompt, function () {
  rl.question('Do you want to countnue ? ', function (answer) {
    console.log(`${answer}`);
    rl.close();
  });
});

rl.on('close', function () {
  process.exit(0);
});
