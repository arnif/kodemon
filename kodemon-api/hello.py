from kodemon import kodemon

@kodemon
def foo():
	for x in range(0,100):
		print x
for x in range(0,1):
	foo()
