def prune_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    # Create a dictionary to store words and their lines
    word_dict = {}
    for line in lines:
        parts = line.split()
        if len(parts) == 3:
            n1, word, n2 = parts
            lower_word = word.lower()
            if lower_word not in word_dict:
                word_dict[lower_word] = []
            word_dict[lower_word].append((word, line))
    
    # Create a list to store the pruned lines
    pruned_lines = []
    
    for word_entries in word_dict.values():
        if len(word_entries) > 1:
            # Check for both capitalized and lowercase entries
            lower_exists = any(w[0].islower() for w in word_entries)
            for word, line in word_entries:
                if word.islower() or not lower_exists:
                    pruned_lines.append(line)
        else:
            pruned_lines.append(word_entries[0][1])
    
    # Write the pruned lines to the output file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.writelines(pruned_lines)

# Usage example
input_file = 'eng-ca_web_2020_10K-words.txt'
output_file = 'output.txt'
prune_file(input_file, output_file)