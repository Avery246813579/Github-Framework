import os
import json
from pprint import pprint

arr = os.listdir('../lib')
combined = ""

for file in arr:
    with open('../lib/' + file) as data_file:
        data = json.load(data_file)

    combined += json.dumps(data)
    pprint(data)

writer = open('../chrome/frameworks.js', 'w')
writer.write('let dog = ' + combined + ';')
writer.close()

if __name__ == "__main__":
    print("Here")