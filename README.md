# GPT-3 VS Code Plugin

A VS Code plugin that allows you to use OpenAI's GPT-3 to generate code for your projects.

## Features

- Convert comments to code
- Convert unit tests to implementation
- Execute GPT-3 on the current line
- Execute GPT-3 on the full file

## Usage

To use the GPT-3 extension, follow these steps:

1. Make sure you have an OpenAI API key. You can obtain one by signing up for a free account on the [OpenAI website](https://beta.openai.com/signup/).
2. In Visual Studio Code, go to the `Extensions` tab and search for `GPT-3`.
3. Click the `Install` button to install the extension.
4. Once the extension is installed, click the `Reload` button to activate it.
5. In the `Command Palette` (Ctrl+Shift+P), search for `GPT-3: Set API Key` and enter your API key.
6. To use the extension, open a file in Visual Studio Code and select the text you want to convert or execute.
7. In the `Command Palette`, search for the command you want to use (e.g. `GPT-3: Convert Comments`, `GPT-3: Convert Tests`, etc.).
8. Select the command and follow the prompts to generate the code or execute GPT-3.


## Requirements

- OpenAI API key

## Extension Settings

This extension contributes the following settings:

- `gpt3.apiKey`: the API key for OpenAI's GPT-3

## Troubleshooting

If you encounter any issues while using the GPT-3 extension, try the following steps:

1. Make sure you have entered a valid API key. You can check your API key by going to the `Command Palette` and searching for `GPT-3: Show API Key`.
2. If you are trying to convert or execute code, make sure you have selected the text you want to convert or execute.
3. If you are still having issues, try uninstalling and reinstalling the extension.
4. If the problem persists, please [create an issue](https://github.com/your-username/gpt-3-vscode/issues) on the GitHub repository with a detailed description of the problem and any error messages you may have received.


## Release Notes

### 1.0.0

Initial release of the GPT-3 VS Code plugin.