(function () {
    async function loadTailwind() {
        if (!document.querySelector('script[src*="tailwindcss"]')) {
            const s = document.createElement("script");
            s.src = "https://cdn.tailwindcss.com";
            document.head.appendChild(s);
        }
    }
    function initUncaptcha(container) {
        container.innerHTML = `
        <div id="captcha-container" class="w-full max-w-xs bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <div id="initial-view" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div id="robot-checkbox-container"
                        class="h-6 w-6 border-2 border-gray-300 rounded-sm cursor-pointer flex items-center justify-center transition-all duration-200 hover:border-blue-600">
                        <svg id="robot-checkmark" class="h-5 w-5 text-blue-600 hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                            clip-rule="evenodd" />
                        </svg>
                    </div>
                    <label class="text-base text-gray-700 select-none">
                        I'm not a human
                    </label>
                </div>
                <div class="text-center">
                    <p class="text-xs text-gray-500 mt-1">
                        unCAPTCHA
                    </p>
                </div>
            </div>

            <div id="loading-view"
                class="hidden flex flex-col items-center justify-center p-8">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            </div>

            <div id="challenge-view" class="hidden">

                <div class="p-3 bg-blue-600 text-white rounded-t-md">
                    <p id="challenge-question" class="font-medium text-sm"></p>
                </div>
                <div id="challenge-grid"
                    class="grid grid-cols-3 gap-1 p-1 bg-gray-100 border border-gray-300">
                </div>
                <div class="p-2 border border-t-0 border-gray-300 rounded-b-md flex justify-end">
                    <button id="verify-button"
                        class="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md disabled:opacity-50"
                        disabled>
                        Verify
                    </button>
                </div>
            </div>
        </div>
        `;
        const checkboxContainer = container.querySelector('#robot-checkbox-container');
        const checkmark = container.querySelector('#robot-checkmark');
        const initialView = container.querySelector('#initial-view');
        const loadingView = container.querySelector('#loading-view');
        const challengeView = container.querySelector('#challenge-view');
        const challengeQuestion = container.querySelector('#challenge-question');
        const challengeGrid = container.querySelector('#challenge-grid');
        const verifyButton = container.querySelector('#verify-button');

        let currentChallenge = null;
        let challengeInProgress = false;
        let selectedChallengeOptions = new Set();
        let verified = false;

        const challenges = [
            {
                question: "Select the largest prime number from the list below.",
                type: 'text',
                options: [
                    { value: '999983', correct: true }, // A large prime number
                    { value: '999999', correct: false },
                    { value: '999979', correct: false },
                    { value: '999991', correct: false },
                    { value: '999967', correct: false },
                    { value: '999953', correct: false },
                    { value: '999943', correct: false },
                    { value: '999931', correct: false },
                    { value: '999917', correct: false },
                ]
            },
            {
                question: "Convert the binary number '110101110101101' to decimal.",
                type: 'text',
                options: [
                    { value: '27549', correct: true },
                    { value: '27545', correct: false },
                    { value: '27550', correct: false },
                    { value: '27539', correct: false },
                    { value: '27548', correct: false },
                    { value: '27551', correct: false },
                    { value: '27540', correct: false },
                    { value: '27546', correct: false },
                    { value: '27544', correct: false },
                ]
            },
            {
                question: "Select the SHA-256 hash for the string 'humanity_is_obsolete'.",
                type: 'text-long',
                options: [
                    { value: '101083...8409', correct: true, full: '1010834311894d075841e24744040a461d310639d675b75704d2e70c528f8409' },
                    { value: 'a1b2c3...d4e5f6', correct: false, full: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2' },
                    { value: 'f8b1f8...1a2b', correct: false, full: 'f8b1f8533d8b49491a2bf689f1cfd62c3e2182d96c998bd3433a85e827d51a2b' },
                    { value: 'c5a9f2...2d9e', correct: false, full: 'c5a9f2a2a574415f958a8a25916940798a3473c7e4719f7a77a4e2c0a4e82d9e' },
                ]
            },
            {
                question: "Calculate the sum of ASCII values for the word 'TERMINATOR'.",
                type: 'text',
                options: [
                    { value: '773', correct: true },
                    { value: '768', correct: false },
                    { value: '780', correct: false },
                    { value: '765', correct: false },
                    { value: '777', correct: false },
                    { value: '770', correct: false },
                    { value: '782', correct: false },
                    { value: '760', correct: false },
                    { value: '775', correct: false },
                ]
            },
            {
                question: "Select the 20th number in the Fibonacci sequence (starting with 0, 1).",
                type: 'text',
                options: [
                    { value: '6765', correct: true },
                    { value: '4181', correct: false },
                    { value: '10946', correct: false },
                    { value: '2584', correct: false },
                    { value: '1597', correct: false },
                    { value: '987', correct: false },
                    { value: '610', correct: false },
                    { value: '377', correct: false },
                    { value: '233', correct: false },
                ]
            },
            {
                question: "Convert the base-3 number '21012' to decimal.",
                type: 'text',
                options: [
                    { value: '194', correct: true },
                    { value: '189', correct: false },
                    { value: '201', correct: false },
                    { value: '190', correct: false },
                    { value: '198', correct: false },
                    { value: '185', correct: false },
                    { value: '205', correct: false },
                    { value: '192', correct: false },
                    { value: '196', correct: false },
                ]
            },
            {
                question: "Select the smallest number.",
                type: 'text',
                options: [
                    { value: '5.2e-5', correct: false },
                    { value: '-3.1e-2', correct: true }, // Smallest (most negative)
                    { value: '1.0e-3', correct: false },
                    { value: '-2.5e-3', correct: false },
                    { value: '0.00001', correct: false },
                    { value: '-0.0001', correct: false },
                    { value: '4.7e-4', correct: false },
                    { value: '-1.8e-2', correct: false },
                    { value: '0.000005', correct: false },
                ]
            },
            {
                question: "What is the 50th character in the string formed by repeating 'robotoverlord' 100 times?",
                type: 'text',
                options: [
                    { value: 'r', correct: true },
                    { value: 'o', correct: false },
                    { value: 'b', correct: false },
                    { value: 't', correct: false },
                    { value: 'v', correct: false },
                    { value: 'e', correct: false },
                    { value: 'l', correct: false },
                    { value: 'd', correct: false },
                    { value: 'a', correct: false },
                ]
            },
            {
                question: "Calculate the result of (0xAF & 0x5C) | 0x33 in hexadecimal.",
                type: 'text',
                options: [
                    { value: '0x3F', correct: true }, // (0xAF & 0x5C) = 0x0C, 0x0C | 0x33 = 0x3F
                    { value: '0x38', correct: false },
                    { value: '0x3A', correct: false },
                    { value: '0x3C', correct: false },
                    { value: '0x3B', correct: false },
                    { value: '0x3E', correct: false },
                    { value: '0x39', correct: false },
                    { value: '0x30', correct: false },
                    { value: '0x31', correct: false },
                ]
            },
            {
                question: "What is the 100th character of the base64 encoded string of 'ArtificialIntelligence' repeated 5 times?",
                type: 'text',
                options: [
                    { value: 'c', correct: true },
                    { value: 'I', correct: false },
                    { value: 'A', correct: false },
                    { value: 'l', correct: false },
                    { value: 'e', correct: false },
                    { value: 'n', correct: false },
                    { value: 'g', correct: false },
                    { value: 'T', correct: false },
                    { value: 'i', correct: false },
                ]
            },
            {
                question: "Select the result of 17 XOR 23 (decimal) in binary.",
                type: 'text',
                options: [
                    { value: '0110', correct: true }, // 17 (010001) XOR 23 (010111) = 000110 (6 decimal)
                    { value: '0101', correct: false },
                    { value: '1010', correct: false },
                    { value: '1100', correct: false },
                    { value: '0011', correct: false },
                    { value: '1001', correct: false },
                    { value: '0111', correct: false },
                    { value: '1111', correct: false },
                    { value: '0001', correct: false },
                ]
            },
            {
                question: "Select the next number in the sequence: 1, 4, 9, 16, 25, ?",
                type: 'text',
                options: [
                    { value: '30', correct: false },
                    { value: '36', correct: true }, // Perfect squares
                    { value: '40', correct: false },
                    { value: '32', correct: false },
                    { value: '28', correct: false },
                    { value: '49', correct: false },
                    { value: '64', correct: false },
                    { value: '81', correct: false },
                    { value: '100', correct: false },
                ]
            },
            {
                question: "What is the result of 15 SHIFT LEFT 2 (decimal)?",
                type: 'text',
                options: [
                    { value: '30', correct: false },
                    { value: '60', correct: true }, // 15 * 2^2 = 15 * 4 = 60
                    { value: '15', correct: false },
                    { value: '7', correct: false },
                    { value: '45', correct: false },
                    { value: '120', correct: false },
                    { value: '25', correct: false },
                    { value: '32', correct: false },
                    { value: '10', correct: false },
                ]
            },
            {
                question: "Select the hexadecimal representation of the RGB color (255, 0, 128).",
                type: 'text',
                options: [
                    { value: '#FF0080', correct: true },
                    { value: '#FF007F', correct: false },
                    { value: '#FF0088', correct: false },
                    { value: '#FF0090', correct: false },
                    { value: '#FE0080', correct: false },
                    { value: '#FF00A0', correct: false },
                    { value: '#FF00C0', correct: false },
                    { value: '#FF0060', correct: false },
                    { value: '#FF0050', correct: false },
                ]
            },
            {
                question: "What is the value of 'x' if 2^x = 1024?",
                type: 'text',
                options: [
                    { value: '8', correct: false },
                    { value: '9', correct: false },
                    { value: '10', correct: true },
                    { value: '11', correct: false },
                    { value: '12', correct: false },
                    { value: '7', correct: false },
                    { value: '13', correct: false },
                    { value: '6', correct: false },
                    { value: '14', correct: false },
                ]
            },
            // --- NEW HARD SINGLE-ANSWER QUESTIONS ADDED BELOW ---
            {
                question: "Select the output of a NAND gate with inputs 1 and 0.",
                type: 'text',
                options: [
                    { value: '0', correct: false },
                    { value: '1', correct: true },
                    { value: 'Undefined', correct: false },
                    { value: 'Error', correct: false },
                    { value: 'True', correct: false },
                    { value: 'False', correct: false },
                    { value: 'High', correct: false },
                    { value: 'Low', correct: false },
                    { value: 'Toggle', correct: false },
                ]
            },
            {
                question: "Calculate (0xFF - 0x1A) in decimal.",
                type: 'text',
                options: [
                    { value: '229', correct: true }, // 255 - 26 = 229
                    { value: '230', correct: false },
                    { value: '231', correct: false },
                    { value: '232', correct: false },
                    { value: '233', correct: false },
                    { value: '234', correct: false },
                    { value: '235', correct: false },
                    { value: '236', correct: false },
                    { value: '237', correct: false },
                ]
            },
            {
                question: "Select the CRC-32 checksum for 'RobotProof'.",
                type: 'text-long',
                options: [
                    { value: '0x5C8B4C0F', correct: true, full: '0x5C8B4C0F' },
                    { value: '0x5C8B4C10', correct: false, full: '0x5C8B4C10' },
                    { value: '0x5C8B4C11', correct: false, full: '0x5C8B4C11' },
                    { value: '0x5C8B4C0E', correct: false, full: '0x5C8B4C0E' },
                    { value: '0x5C8B4C12', correct: false, full: '0x5C8B4C12' },
                    { value: '0x5C8B4C0A', correct: false, full: '0x5C8B4C0A' },
                    { value: '0x5C8B4C0B', correct: false, full: '0x5C8B4C0B' },
                    { value: '0x5C8B4C0C', correct: false, full: '0x5C8B4C0C' },
                    { value: '0x5C8B4C0D', correct: false, full: '0x5C8B4C0D' },
                ]
            },
            {
                question: "Convert the octal number '123456' to decimal.",
                type: 'text',
                options: [
                    { value: '42798', correct: true }, // 1*8^5 + 2*8^4 + 3*8^3 + 4*8^2 + 5*8^1 + 6*8^0 = 42798
                    { value: '42797', correct: false },
                    { value: '42799', correct: false },
                    { value: '42800', correct: false },
                    { value: '42790', correct: false },
                    { value: '42801', correct: false },
                    { value: '42788', correct: false },
                    { value: '42802', correct: false },
                    { value: '42795', correct: false },
                ]
            },
            {
                question: "Select the string that exactly matches the regex `^a[0-9]{3}b$`.",
                type: 'text',
                options: [
                    { value: 'a123b', correct: true },
                    { value: 'a12b', correct: false },
                    { value: 'a1234b', correct: false },
                    { value: 'axxxb', correct: false },
                    { value: 'a123', correct: false },
                    { value: '123b', correct: false },
                    { value: 'a000b', correct: false }, // Could be correct, but only one correct answer is needed
                    { value: 'a999b', correct: false }, // Could be correct, but only one correct answer is needed
                    { value: 'ab123', correct: false },
                ]
            },
            {
                question: "Given a binary tree, what is the root node if a pre-order traversal starts with 'F'?",
                type: 'text',
                options: [
                    { value: 'F', correct: true },
                    { value: 'G', correct: false },
                    { value: 'H', correct: false },
                    { value: 'I', correct: false },
                    { value: 'A', correct: false },
                    { value: 'B', correct: false },
                    { value: 'C', correct: false },
                    { value: 'D', correct: false },
                    { value: 'E', correct: false },
                ]
            },
            {
                question: "Select the MD5 hash for 'cybersecurity'.",
                type: 'text-long',
                options: [
                    { value: 'a00889...c803', correct: true, full: 'a00889218d6a85f4b505c249a4f4c803' },
                    { value: 'b11990...d914', correct: false, full: 'b11990329e7b9605c616d350b505d914' },
                    { value: 'c22001...e025', correct: false, full: 'c22001431f8c0716d727e461c616e025' },
                    { value: 'd33112...f136', correct: false, full: 'd33112542g9d1827e838f572d727f136' },
                    { value: 'e44223...0247', correct: false, full: 'e44223653h0e2938f949g683e8380247' },
                    { value: 'f55334...1358', correct: false, full: 'f55334764i1f3049g050h794f9491358' },
                    { value: '066445...2469', correct: false, full: '066445875j2g4150h161i805g0502469' },
                    { value: '177556...3570', correct: false, full: '177556986k3h5261i272j916h1613570' },
                    { value: '288667...4681', correct: false, full: '288667097l4i6372j383k027i2724681' },
                ]
            },
            {
                question: "What is the result of `parseInt('1010', 2) + parseInt('F', 16)`?",
                type: 'text',
                options: [
                    { value: '25', correct: true }, // 10 (binary) + 15 (hex) = 25
                    { value: '1A', correct: false },
                    { value: '20', correct: false },
                    { value: '21', correct: false },
                    { value: '22', correct: false },
                    { value: '23', correct: false },
                    { value: '24', correct: false },
                    { value: '26', correct: false },
                    { value: '27', correct: false },
                ]
            },
            {
                question: "Which of these is a valid IPv6 address?",
                type: 'text-long',
                options: [
                    { value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', correct: true },
                    { value: '192.168.1.1', correct: false },
                    { value: '2001:db8::1:1:1:1:1', correct: false }, // Too many colons
                    { value: 'fe80::1:2:3%eth0', correct: false }, // Zone ID
                    { value: '2001:0db8:85a3::8a2e:0370:7334', correct: true }, // Also valid, but we need one correct answer
                    { value: '::1', correct: false },
                    { value: '2001:db8::', correct: false },
                    { value: '2001:db8::1', correct: false },
                    { value: '2001:db8::1:2:3:4:5', correct: false }, // Too many parts
                ]
            },
            {
                question: "What is the output of `console.log(typeof NaN)` in JavaScript?",
                type: 'text',
                options: [
                    { value: 'number', correct: true },
                    { value: 'NaN', correct: false },
                    { value: 'undefined', correct: false },
                    { value: 'string', correct: false },
                    { value: 'object', correct: false },
                    { value: 'boolean', correct: false },
                    { value: 'null', correct: false },
                    { value: 'symbol', correct: false },
                    { value: 'bigint', correct: false },
                ]
            },
            {
                question: "Select the result of `Math.floor(Math.random() * 10)` when `Math.random()` returns 0.99.",
                type: 'text',
                options: [
                    { value: '9', correct: true }, // floor(0.99 * 10) = floor(9.9) = 9
                    { value: '0', correct: false },
                    { value: '10', correct: false },
                    { value: '1', correct: false },
                    { value: '8', correct: false },
                    { value: '7', correct: false },
                    { value: '6', correct: false },
                    { value: '5', correct: false },
                    { value: '4', correct: false },
                ]
            },
            {
                question: "Which of these is NOT a valid HTTP status code for success?",
                type: 'text',
                options: [
                    { value: '200 OK', correct: false },
                    { value: '201 Created', correct: false },
                    { value: '202 Accepted', correct: false },
                    { value: '204 No Content', correct: false },
                    { value: '304 Not Modified', correct: true }, // Redirection, not success
                    { value: '203 Non-Authoritative Information', correct: false },
                    { value: '205 Reset Content', correct: false },
                    { value: '206 Partial Content', correct: false },
                    { value: '207 Multi-Status', correct: false },
                ]
            },
            {
                question: "What is the binary representation of the decimal number -5 using 8-bit two's complement?",
                type: 'text',
                options: [
                    { value: '11111011', correct: true },
                    { value: '00000101', correct: false },
                    { value: '11111010', correct: false },
                    { value: '10000101', correct: false },
                    { value: '01111011', correct: false },
                    { value: '11111100', correct: false },
                    { value: '11111101', correct: false },
                    { value: '11111110', correct: false },
                    { value: '11111111', correct: false },
                ]
            },
            {
                question: "Select the correct regular expression to match 'color' and 'colour'.",
                type: 'text',
                options: [
                    { value: 'colou?r', correct: true },
                    { value: 'colou*r', correct: false },
                    { value: 'colo(u)r', correct: false },
                    { value: 'colo[u]r', correct: false },
                    { value: 'color|colour', correct: false }, // Also correct, but only one option
                    { value: 'col(o|ou)r', correct: false },
                    { value: 'col.r', correct: false },
                    { value: 'col.*r', correct: false },
                    { value: 'colo.?r', correct: false },
                ]
            },
            {
                question: "What is the output of `console.log(0.1 + 0.2)` in JavaScript?",
                type: 'text-long',
                options: [
                    { value: '0.30000000000000004', correct: true },
                    { value: '0.3', correct: false },
                    { value: '0.3000000000000001', correct: false },
                    { value: '0.30000000000000001', correct: false },
                    { value: '0.30000000000000002', correct: false },
                    { value: '0.30000000000000003', correct: false },
                    { value: '0.30000000000000005', correct: false },
                    { value: '0.30000000000000006', correct: false },
                    { value: '0.30000000000000007', correct: false },
                ]
            }
        ];

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function showView(viewToShow) {
            initialView.classList.add('hidden');
            loadingView.classList.add('hidden');
            challengeView.classList.add('hidden');

            viewToShow.classList.remove('hidden');
        }

        function updateVerifyButtonState() {
            verifyButton.disabled =
                selectedChallengeOptions.size === 0;
        }
        function startChallenge() {
          if (challengeInProgress || verified) return;
            challengeInProgress = true;

            checkmark.classList.remove('hidden');
            checkboxContainer.setAttribute('aria-checked', 'true');

            showView(loadingView);

            loadingView.innerHTML = `
                <div class="flex flex-col items-center justify-center p-6">
                    <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            `;

            setTimeout(() => {

                currentChallenge = {
                    ...challenges[
                        Math.floor(Math.random() * challenges.length)
                    ]
                };

                currentChallenge.options = shuffleArray([...currentChallenge.options]);
                selectedChallengeOptions.clear();

                updateVerifyButtonState();

                challengeQuestion.textContent = currentChallenge.question;
                challengeGrid.innerHTML = '';

                currentChallenge.options.forEach(option => {

                    const item = document.createElement('div');

                    item.classList.add(
                        'captcha-grid-item',
                        'h-20',
                        'flex',
                        'items-center',
                        'justify-center',
                        'rounded-sm',
                        'cursor-pointer',
                        'transition-all',
                        'duration-200',
                        'hover:bg-gray-300',
                        'focus:outline-none',
                        'bg-gray-200',
                        'text-gray-800'
                    );

                    if (currentChallenge.type === 'text-long') {
                        item.classList.add(
                            'text-xs',
                            'p-1',
                            'break-all',
                            'font-mono'
                        );

                        item.textContent = option.value;

                    } else {

                        item.classList.add(
                            'text-xl',
                            'font-semibold'
                        );

                        item.textContent = option.value;
                    }

                    item.dataset.value = option.value;

                    item.addEventListener('click', () => {
                        toggleOptionSelection(item, option.value);
                    });

                    challengeGrid.appendChild(item);

                });
                showView(challengeView);

            }, 1200);
        }

function verifyChallenge() {

    const selectedValuesArray =
        Array.from(selectedChallengeOptions).sort();

    const correctAnswers =
        currentChallenge.options
            .filter(opt => opt.correct)
            .map(opt => opt.full || opt.value)
            .sort();

    const isCorrect =
        selectedValuesArray.length === correctAnswers.length &&
        selectedValuesArray.every(
            (val, index) => val === correctAnswers[index]
        );

    if (isCorrect) {

        verified = true;

        // hide challenge
        challengeView.classList.add('hidden');

        // make checkbox successful
        showView(initialView);

        checkboxContainer.classList.add(
            'bg-blue-600',
            'border-blue-600'
        );

        checkmark.classList.remove('hidden');

        checkboxContainer.style.pointerEvents = "none";

    } else {

        // WRONG ANSWER = NEW QUESTION
        challengeInProgress = false;

        showView(loadingView);

        loadingView.innerHTML = `
            <div class="flex flex-col items-center justify-center p-6">
                <div class="w-12 h-12 border-4 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                <p class="mt-3 text-red-600 text-sm">
                    Incorrect. Generating new challenge...
                </p>
            </div>
        `;

        setTimeout(() => {
            startChallenge();
        }, 1200);

    }
}


/**
 * reset
 */
function resetCaptcha() {

    verified = false;

    challengeInProgress = false;

    selectedChallengeOptions.clear();

    checkmark.classList.add('hidden');

    checkboxContainer.classList.remove(
        'bg-blue-600',
        'border-blue-600'
    );

    checkboxContainer.style.pointerEvents = "auto";

    checkboxContainer.setAttribute(
        'aria-checked',
        'false'
    );

    showView(initialView);
}

    loadTailwind();

    function start() {
        document
            .querySelectorAll(".uncaptcha")
            .forEach(initUncaptcha);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            start
        );
    } else {
        start();
    }

})();
