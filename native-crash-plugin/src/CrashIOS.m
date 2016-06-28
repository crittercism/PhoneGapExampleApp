#import "CrashIOS.h"

@implementation CrashIOS

- (void)execute:(CDVInvokedUrlCommand*)command
{
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        @[][666];
    });
    
}

@end
